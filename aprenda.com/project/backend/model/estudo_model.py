from beanie import Document
from datetime import date, datetime
from pydantic import field_validator

class Estudo(Document):
    materia: str
    topico: str
    horas: int
    data: date  # Mantemos apenas date para não ter horas

    @field_validator('data', mode='before')
    @classmethod
    def validar_data_br(cls, v):
        if isinstance(v, str):
            try:
                # O segredo está aqui: transformar "15/03/2026" em um objeto date
                return datetime.strptime(v, "%d/%m/%Y").date()
            except ValueError:
                raise ValueError("Formato de data inválido. Use DD/MM/AAAA")
        return v

    class Settings:
        name = "estudos"