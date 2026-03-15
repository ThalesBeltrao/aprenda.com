from fastapi import APIRouter
from model.estudo_model import Estudo

dash_router = APIRouter(prefix="/dash", tags=["Dash"])

@dash_router.get("/stats-materias")
async def get_stats_materias():
    pipeline = [
        {
            "$group": {
                "_id": "$materia", 
                # Somamos os segundos e dividimos por 3600 para obter horas decimais
                "totalHoras": {"$sum": {"$divide": ["$horas", 3600]}}
            }
        },
        {"$sort": {"totalHoras": -1}},
        {"$limit": 5}
    ]

    results = await Estudo.aggregate(pipeline).to_list()

    return {
        # Arredondamos para 2 casas decimais para o gráfico ficar limpo
        "labels": [r["_id"] for r in results],
        "series": [round(r["totalHoras"], 2) for r in results]
    }

@dash_router.get("/stats-mensal")
async def get_stats_mensal():
    pipeline = [
        {
            "$group": {
                "_id": {"$month": "$data"},
                # Mesma lógica: converter segundos acumulados do mês para horas
                "totalHoras": {"$sum": {"$divide": ["$horas", 3600]}}
            }
        },
        {"$sort": {"_id": 1}}
    ]

    results = await Estudo.aggregate(pipeline).to_list()

    meses_nome = [
        "Jan","Fev","Mar","Abr","Mai","Jun",
        "Jul","Ago","Set","Out","Nov","Dez"
    ]

    return {
        "labels": [meses_nome[r["_id"] - 1] for r in results],
        "series": [round(r["totalHoras"], 2) for r in results]
    }