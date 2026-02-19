// Configurações base para evitar repetição de código (DRY)
const commonOptions = {
    chart: { height: 320, background: "transparent", toolbar: { show: false } },
    theme: { mode: "dark" },
    dataLabels: { enabled: false },
    grid: { borderColor: "#333" },
    xaxis: { labels: { style: { colors: "#ffffff" } } },
    yaxis: { 
        labels: { style: { colors: "#ffffff" } },
        title: { style: { color: "#ffffff" }, text: "Horas" }
    },
    tooltip: { 
        theme: "dark", 
        y: { formatter: (val) => `${val} horas` } 
    }
};

// --- Inicialização dos Gráficos (Vazios) ---

const barChart = new ApexCharts(document.querySelector("#bar-chart"), {
    ...commonOptions,
    chart: { ...commonOptions.chart, type: "bar" },
    colors: ["#00ab57"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
    series: [{ name: "Horas estudadas", data: [] }], // Começa vazio
});

const areaChart = new ApexCharts(document.querySelector("#area-chart"), {
    ...commonOptions,
    chart: { ...commonOptions.chart, type: "area" },
    colors: ["#4f9cff"],
    stroke: { curve: "smooth", width: 3 },
    fill: {
        type: "gradient",
        gradient: { shadeIntensity: 1, opacityFrom: 0.6, opacityTo: 0.1, stops: [0, 90, 100] }
    },
    series: [{ name: "Horas estudadas", data: [] }], // Começa vazio
});

barChart.render();
areaChart.render();

// --- Função para Buscar e Atualizar Dados ---

async function fetchDashboardData() {
    const API_URL = "/dash"; // Ajuste para sua URL real

    try {
        // Buscando dados em paralelo para maior performance
        const [resBarras, resMensal] = await Promise.all([
            fetch(`${API_URL}/stats-materias`),
            fetch(`${API_URL}/stats-mensal`)
        ]);

        const dataBarras = await resBarras.json();
        const dataMensal = await resMensal.json();

        // Atualiza Gráfico de Barras
        barChart.updateOptions({
            xaxis: { categories: dataBarras.labels }
        });
        barChart.updateSeries([{ data: dataBarras.series }]);

        // Atualiza Gráfico de Área
        areaChart.updateOptions({
            xaxis: { categories: dataMensal.labels }
        });
        areaChart.updateSeries([{ data: dataMensal.series }]);

    } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
    }
}

// Carrega os dados assim que a página abrir
fetchDashboardData();