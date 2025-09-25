object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:3000"

    val healthApiService: HealthApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(HealthApiService::class.java)
    }
}
