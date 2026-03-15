from beanie import Document
from datetime import datetime

class Estudo(Document):
    materia: str
    topico: str
    horas: int
    data: datetime

    class Settings:
        name = "estudos"

