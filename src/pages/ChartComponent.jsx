import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { fetchMissed } from '../services/index.js';
import { useEffect, useState } from 'react';
// const data = [
//     { name: 'Day 1', missedchats: 85 },
//     { name: 'Day 2', missedchats: 30 },
//     { name: 'Day 3', missedchats: 20 },
//     { name: 'Day 4', missedchats: 15 },
//     { name: 'Day 5', missedchats: 25 },
//     { name: 'Day 6', missedchats: 10 },
//     { name: 'Day 7', missedchats: 50 },
//     { name: 'Day 8', missedchats: 70 },
//     { name: 'Day 9', missedchats: 40 },
//     { name: 'Day 10', missedchats: 31 },
//     { name: 'Day 11', missedchats: 10 },
//     { name: 'Day 12', missedchats: 91 },
//     { name: 'Day 13', missedchats: 24 },
//     { name: 'Day 14', missedchats: 64 }
//   ];

    const ChartComponent = () => {
      const [data, setdata]=useState([])


      const summarizeMissedChatsByWeek=(data)=> {
        const result = [];
        let week = 1;
      
        for (let i = 0; i < data.length; i += 7) {
          const weekSlice = data.slice(i, i + 7);
          const missedchats = weekSlice.reduce((sum, day) => sum + day.count, 0);
          result.push({
            name: `week${week}`,
            missedchats,
          });
          week++;
        }
      
        return result;
      }


      const fetchmissedchats = async()=>{
        const response= await fetchMissed()
        console.log(response)
        const data = summarizeMissedChatsByWeek(response.data)

        setdata(data)
      }
      useEffect(()=>{
        console.log('from chart component')
        fetchmissedchats()
      },[])
        return (
        
          <LineChart width={600} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="missedchats" stroke="#00d907" />
            <CartesianGrid stroke="#ccc"  vertical={false}/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        );
      };
      
      export default ChartComponent;