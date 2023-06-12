'use client';


export default function AddToFavoritesButton() {
    const [deviceId, setDeviceId] = useState('');

    // const addToFavorites = async (id) => {
        
    // }

    useEffect(() => {
      const deviceId = localStorage.getItem('deviceId');
      if(deviceId){
        setDeviceId(deviceId)
      }
    }, [])
    
  return (
    // <Button onClick={}>Add To Favorites</Button>
    <div></div>
  )
}
