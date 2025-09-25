interface HealthApiService {
    @GET("/api/healthdata")
    suspend fun getHealthData(): List<HealthEvent>
}
