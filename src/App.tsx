import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-black text-black">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
