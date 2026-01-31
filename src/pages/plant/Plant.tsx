import plant from "../../assets/images/flover-3.png"

export default function PlantCare() {
  return (
    <div className="bg-[#FAFAF9] py-10">
      <section className="max-w-[1200px] h-[450px] bg-[#F0FDF4] mx-auto py-3 px-5 flex items-center gap-18">
        <div>
            <p>WELCOME TO GREENSHOP</p>
          <h1 className="text-[70px] leading-18 font-bold text-[#252625] mb-4">
            LET'S MAKE A <br /> BETTER <span className="text-[#14532D]">PLANET</span>
          </h1>
          <p className="text-gray-600 mb-6">
            We are an online plant shop offering a wide range of cheap and trendy plants. <br /> Use our plants to create an unique Urban Jungle. Order your favorite plants!
          </p>
          <button className="bg-[#14532D] text-white px-6 py-3 rounded-md hover:bg-[#166534] transition">
            Learn More
          </button>
        </div>
        <img src={plant} alt="" />
      </section>

      <section className="max-w-[1200px] mx-auto py-12">
        <h2 className="text-2xl font-semibold text-[#14532D] mb-8">
          Plant Care Basics
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Light", icon: "🌞", text: "Choose the right light level" },
            { title: "Watering", icon: "💧", text: "Do not overwater plants" },
            { title: "Temperature", icon: "🌡", text: "Keep stable temperature" },
            { title: "Soil", icon: "🌱", text: "Use quality soil mix" },
            { title: "Pruning", icon: "✂️", text: "Remove dry leaves" },
            { title: "Pest Control", icon: "🐛", text: "Protect from insects" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-12">
        <h2 className="text-2xl font-semibold text-[#14532D] mb-8">
          Popular Plant Guides
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Monstera", "Aloe Vera", "Snake Plant"].map((plant) => (
            <div
              key={plant}
              className="bg-white p-6 rounded-2xl border border-gray-200"
            >
              <h3 className="font-semibold text-lg mb-2">{plant}</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>💧 Water: 1–2 times/week</li>
                <li>🌞 Light: Indirect sunlight</li>
                <li>⭐ Difficulty: Easy</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto py-12">
        <h2 className="text-2xl font-semibold text-[#14532D] mb-6">FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-xl border">
            <summary className="font-medium cursor-pointer">
              Why are my plant leaves turning yellow?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              Usually caused by overwatering or lack of light.
            </p>
          </details>
          <details className="bg-white p-4 rounded-xl border">
            <summary className="font-medium cursor-pointer">
              How often should I water plants?
            </summary>
            <p className="text-sm text-gray-600 mt-2">
              Depends on plant type, usually once or twice a week.
            </p>
          </details>
        </div>
      </section>

      <section className="bg-[#14532D] py-16 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">
          Need Products for Plant Care?
        </h2>
        <p className="mb-6 text-white/80">
          Discover fertilizers, pots, and soil for healthy plants
        </p>
        <button className="bg-white text-[#14532D] px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
          Shop Now
        </button>
      </section>
    </div>
  );
}
