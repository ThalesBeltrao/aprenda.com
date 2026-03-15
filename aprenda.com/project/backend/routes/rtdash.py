from fastapi import APIRouter
from model.estudo_model import Estudo

dash_router = APIRouter(prefix="/dash", tags=["Dash"])


@dash_router.get("/stats-materias")
async def get_stats_materias():

    pipeline = [
        {"$group": {"_id": "$materia", "totalHoras": {"$sum": "$horas"}}},
        {"$sort": {"totalHoras": -1}},
        {"$limit": 5}
    ]

    results = await Estudo.aggregate(pipeline).to_list()

    return {
        "labels": [r["_id"] for r in results],
        "series": [r["totalHoras"] for r in results]
    }


@dash_router.get("/stats-mensal")
async def get_stats_mensal():

    pipeline = [
        {
            "$group": {
                "_id": {"$month": "$data"},
                "totalHoras": {"$sum": "$horas"}
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
        "series": [r["totalHoras"] for r in results]
    }
