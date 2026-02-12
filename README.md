![Status](https://img.shields.io/badge/status-em%20construção-yellow)<br>

![Status](https://img.shields.io/badge/status-beta-blue)

# 📊 aprenda.com - Dashboard de Analytics

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=F7DF1E&width=435&lines=Consumindo+API+FastAPI...;Renderizando+Charts+din%C3%A2micos...;Dashboard+aprenda.com+v1.0" alt="Typing SVG" />


## ✅ Progresso do Desenvolvimento
- [x] Configuração do Nginx como Reverse Proxy
- [x] Integração FastAPI + MongoDB
- [x] Renderização de gráficos com Chart.js
- [ ] Sistema de autenticação (JWT)
- [ ] Deploy em Cluster Kubernetes

graph LR
    User((👤 Usuário)) -->|Port 80| Nginx[🌐 Nginx Reverse Proxy]
    
    Nginx -->|Roteia /| Static[🎨 Frontend: HTML/CSS/JS]
    Nginx -->|Roteia /api| API[⚡ Backend: FastAPI]
    
    API --> DB[(🍃 MongoDB Atlas)]
    DB -->|Documentos| API
    
    API -->|JSON| Static
    Static -->|📈 Chart.js| Charts[📊 Gráficos Dinâmicos]


<br><br>

![Project](https://img.shields.io/badge/IMAGE-PROJECT-blue?style=for-the-badge&logo=github)

![Print do Projeto](/aprenda.com/project/img/image.png)