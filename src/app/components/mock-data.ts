export interface Programa {
    id: number;
    nombre: string;
  }
  
  export interface Actividad {
    id: number;
    name: string;
  }
  
  export interface Transactional {
    id?: string;
    id_programs: string;
    id_activities: string;
    date_asignation: string;
    direction: string;
    name_programs: string;
    name_activities: string;
    active: string;
  }
  
  export const PROGRAMAS: Programa[] = [
    { id: 1, nombre: "Programa 1" },
    { id: 2, nombre: "Programa 2" },
    { id: 3, nombre: "Programa 3" },
    { id: 4, nombre: "Programa 4" },
  ];
  
  