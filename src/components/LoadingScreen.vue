<template>
    <div class="loading-screen">
        <div class="spinner"></div>
        <p>Cargando datos de la galaxia...</p>
    </div>
</template>

<script>
export default { name: 'LoadingScreen' };
</script>

<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #333;
    border-top: 5px solid #ffe81f;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-screen p {
    margin-top: 1rem;
    color: #ffe81f;
    font-family: 'StarJedi', sans-serif;
}
</style>