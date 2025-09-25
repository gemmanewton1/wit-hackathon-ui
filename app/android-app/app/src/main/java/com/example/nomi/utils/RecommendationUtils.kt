object RecommendationUtils {
    fun generate(events: List<HealthEvent>): String {
        val hasWorkout = events.any { it.type == "workout" }
        val hasSleep = events.find { it.type == "sleep" }?.title?.contains("5.5") ?: false
        val hasMeetingClash = events.any { it.type == "meeting" } &&
                events.any { it.type == "workout" }

        return buildString {
            if (hasMeetingClash) append("Move workout to avoid meeting. ")
            if (!hasWorkout) append("Join local run club today. ")
            if (hasSleep) append("You slept poorly. Consider a rest day. ")
            append("Drink water and take breaks.")
        }
    }
}
