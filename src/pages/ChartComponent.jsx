import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { fetchMissed } from '../services/index.js';
import { useEffect, useState } from 'react';

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