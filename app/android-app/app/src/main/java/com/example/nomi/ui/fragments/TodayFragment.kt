import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.nomi.R
import kotlinx.coroutines.launch
import java.time.LocalDate

class TodayFragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var recommendationText: TextView
    private val events = mutableListOf<HealthEvent>()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val view = inflater.inflate(R.layout.fragment_today, container, false)

        recyclerView = view.findViewById(R.id.recyclerView)
        recommendationText = view.findViewById(R.id.recommendationText)

        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        recyclerView.adapter = EventAdapter(events)

        fetchHealthData()

        return view
    }


        @RequiresApi(Build.VERSION_CODES.O)
    private fun fetchHealthData() {
        lifecycleScope.launch {
            try {
                val data = ApiClient.healthApiService.getHealthData()
                val today = LocalDate.now().toString()
                events.clear()
                events.addAll(data.filter { it.start.startsWith(today) })
                recyclerView.adapter?.notifyDataSetChanged()
                recommendationText.text = RecommendationUtils.generate(events)
            } catch (e: Exception) {
                Log.e("API_ERROR", e.message ?: "Unknown error")
            }
        }
    }
}
