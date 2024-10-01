export interface TareaDto {
    id?: number
    nombre: string
    fechaFin: string
    personas: PersonaDto[]
    estado: number
}

export interface PersonaDto {
    nombre: string
    edad: number
    habilidades: string[]
}