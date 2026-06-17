import { Injectable } from '@angular/core';

export interface DatosCedula {
  tipoDocumento?: 'CC' | 'TI';
  numeroCedula: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  nombreCompleto: string;
  apellidosCompletos: string;
  sexo: string;
  grupoSanguineo: string;
  fechaNacimiento: string;
  fechaExpedicion: string;
  municipioExpedicion: string;
  rawData: any;
}

@Injectable({ providedIn: 'root' })
export class CedulaParserService {

  desdePDF417(rawData: string): DatosCedula | null {
    if (!rawData) return null;

    const digital = this.parsearDigital(rawData);
    if (digital) return digital;

    for (const sep of ['&', ';', '|', '\n']) {
      if (!rawData.includes(sep)) continue;
      const c = rawData.split(sep).map(s => s.trim());
      if (c.length < 6 || !/^\d{4,12}$/.test(c[0])) continue;

      return {
        tipoDocumento:      'CC',
        numeroCedula:       c[0],
        primerApellido:     this.cap(c[1] ?? ''),
        segundoApellido:    this.cap(c[2] ?? ''),
        primerNombre:       this.cap(c[3] ?? ''),
        segundoNombre:      this.cap(c[4] ?? ''),
        nombreCompleto:     this.cap([c[3], c[4]].filter(Boolean).join(' ')),
        apellidosCompletos: this.cap([c[1], c[2]].filter(Boolean).join(' ')),
        sexo:               this.sexo(c[5] ?? ''),
        grupoSanguineo:     (c[6] ?? '').toUpperCase(),
        fechaNacimiento:    this.fecha8(c[7] ?? ''),
        fechaExpedicion:    this.fecha8(c[8] ?? ''),
        municipioExpedicion: c[9] ?? '',
        rawData
      };
    }
    return null;
  }

  private parsearDigital(rawData: string): DatosCedula | null {
    const raw = rawData.replace(/NUL/g, '\0');

    // Campo combinado: 0[M|F][YYYYMMDD nacimiento][expid][GS]
    // Presente en CC y TI digital colombiana
    let combM  = raw.match(/0([MF])(\d{8})(\d{8})((?:AB?|[ABO])[+\-])/);
    const expir8 = !!combM;
    if (!combM) combM = raw.match(/0([MF])(\d{8})(\d{6})((?:AB?|[ABO])[+\-])/);

    const endIdx = combM ? raw.indexOf(combM[0]) : raw.length;
    const zona   = raw.substring(0, endIdx);

    // Nombres: secuencias mayúsculas con vocal (CC y TI)
    const todosUpper = zona.match(/[A-Z]{2,}/g) ?? [];
    const nombres    = todosUpper.filter(n => /[AEIOU]/.test(n));
    if (nombres.length < 2) return null;

    // NUIP:
    //   CC → dígitos pegados al apellido: "0014254262MALAVER"
    //   TI → campo separado por \0:       ">851486581070626924<" \0 ">MALAVER<"
    let nuip: string;
    const ccNuip = zona.match(/(\d{7,10})([A-Z]{3,})/);
    if (ccNuip) {
      nuip = ccNuip[1].replace(/^0+/, '') || ccNuip[1];
    } else {
      // TI: busca el campo que precede inmediatamente al primer apellido
      const campos = zona.split('\0').map(f => f.replace(/^>|<$/g, '').trim()).filter(Boolean);
      const idxAp1 = campos.indexOf(nombres[0]);
      if (idxAp1 <= 0) return null;
      const campoNuip = campos[idxAp1 - 1];
      const numM = campoNuip.match(/(\d{8,20})/);
      if (!numM) return null;
      // Los últimos 10 dígitos son el NUIP; el prefijo es código de certificado
      const raw10 = numM[1].slice(-10);
      nuip = raw10.replace(/^0+/, '') || raw10;
    }

    let sexo = '', fechaNac = '', fechaExp = '', gs = '';
    if (combM) {
      sexo     = combM[1];
      fechaNac = this.fecha8(combM[2]);
      if (expir8) {
        fechaExp = this.fecha8(combM[3]);
      } else {
        const dd = combM[3].substring(0, 2), mm = combM[3].substring(2, 4);
        const yy = parseInt(combM[3].substring(4, 6));
        fechaExp = `${dd}/${mm}/${yy <= 30 ? 2000 + yy : 1900 + yy}`;
      }
      gs = combM[4];
    }

    const tipoDocumento = combM ? this.detectarTipo(combM[2]) : 'CC';
    const [ap1, ap2, n1, n2] = nombres;

    return {
      tipoDocumento,
      numeroCedula:       nuip,
      primerApellido:     this.cap(ap1 ?? ''),
      segundoApellido:    this.cap(ap2 ?? ''),
      primerNombre:       this.cap(n1 ?? ''),
      segundoNombre:      this.cap(n2 ?? ''),
      nombreCompleto:     this.cap([n1, n2].filter(Boolean).join(' ')),
      apellidosCompletos: this.cap([ap1, ap2].filter(Boolean).join(' ')),
      sexo:               this.sexo(sexo),
      grupoSanguineo:     gs.toUpperCase(),
      fechaNacimiento:    fechaNac,
      fechaExpedicion:    fechaExp,
      municipioExpedicion: '',
      rawData
    };
  }

  private detectarTipo(nacYYYYMMDD: string): 'CC' | 'TI' {
    const y = parseInt(nacYYYYMMDD.substring(0, 4));
    const m = parseInt(nacYYYYMMDD.substring(4, 6)) - 1;
    const d = parseInt(nacYYYYMMDD.substring(6, 8));
    const cumple18 = new Date(y + 18, m, d);
    return new Date() >= cumple18 ? 'CC' : 'TI';
  }

  private sexo(s: string): string {
    const v = s.toUpperCase().trim();
    if (v === 'M' || v === 'MASCULINO') return 'Masculino';
    if (v === 'F' || v === 'FEMENINO')  return 'Femenino';
    return s;
  }

  private fecha8(f: string): string {
    if (!f) return '';
    const s = f.replace(/[-\/]/g, '').trim();
    if (!/^\d{8}$/.test(s)) return f;
    const y = parseInt(s.substring(0, 4));
    return (y >= 1900 && y <= 2099)
      ? `${s.substring(6,8)}/${s.substring(4,6)}/${s.substring(0,4)}`
      : `${s.substring(0,2)}/${s.substring(2,4)}/${s.substring(4,8)}`;
  }

  private cap(t: string): string {
    return t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }
}
