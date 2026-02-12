from pydantic import BaseModel
from datetime import datetime

class Estudo(BaseModel):
    materia: str
    horas: float
    data: datetime


