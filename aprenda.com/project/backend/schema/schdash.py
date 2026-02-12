def estudoEntidade(item) -> dict:
    return {
        "id": str(item["_id"]),
        "materia": str(item["materia"]),
        "horas": item["horas"],
        "data": item["data"]
}