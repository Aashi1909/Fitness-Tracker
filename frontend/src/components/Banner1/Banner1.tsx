import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';
import { FaGreaterThan } from "react-icons/fa";
import './Banner1.css'

const Banner1 = () => {


  const [data, setData] = React.useState<any>(null)

  const getData = async () => {
    // let temp = [
    //   {
    //     "name": "Sleep",
    //     "value": 8,
    //     "unit": "hrs",
    //     "goal": 8,
    //     "goalUnit": "hrs"
    //   },
    //   {
    //     "name": "Steps",
    //     "value": 50,
    //     "unit": "steps",
    //     "goal": 10000,
    //     "goalUnit": "steps"
    //   },
    //   {
    //     "name": "Water",
    //     "value": 2000,
    //     "unit": "ml",
    //     "goal": 3000,
    //     "goalUnit": "ml"
    //   },
    //   {
    //     "name": "Weight",
    //     "value": 75,
    //     "unit": "kg",
    //     "goal": 70,
    //     "goalUnit": "kg"
    //   },
    //   {
    //     "name": "Workout",
    //     "value": 2,
    //     "unit": "days",
    //     "goal": 6,
    //     "goalUnit": "days"
    //   }
    // ]
    // setData(temp)
    // console.log(temp, "tempppppp")
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/report/getreport', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data, "jhgvc")
      if(data.ok){
        setData(data.data)
      }
      else{
        setData([])
      }
    }).catch(err =>{
       console.log(err)
       setData([])
    })
  }

  React.useEffect(() => {
    getData()
  }, [])

  function simplifyFraction(numerator: number, denominator: number): [number, number] {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
    }
    function gcd(a: number, b: number): number {
      a = Math.abs(a);
      b = Math.abs(b);
      return b === 0 ? a : gcd(b, a % b);
    }
    const commonDivisor: number = gcd(numerator, denominator);

    // Simplify the fraction
    const simplifiedNumerator: number = numerator / commonDivisor;
    const simplifiedDenominator: number = denominator / commonDivisor;

    return [simplifiedNumerator, simplifiedDenominator];

  }
  return (
    <div className='meters'>

      {
        data?.length > 0 && data.map((item: any, index: number) => {
          const progressValue = item.goal > 0 ? (item.value / item.goal) * 100 : 0;
        const [simplifiedNum, simplifiedDenom] = simplifyFraction(item.value, item.goal);
          return (
            <div className='card' key={index}>
              <div className='card-header'>
                <div className='card-header-box'>
                  <div className='card-header-box-name'>{item.name}</div>
                  <div className='card-header-box-value'>{parseInt(item.value)} {item.unit}</div>
                </div>
                <div className='card-header-box'>
                  <div className='card-header-box-name'>Target</div>
                  <div className='card-header-box-value'>{parseInt(item.goal)} {item.goalUnit}</div>
                </div>
              </div>

              <CircularProgress
                color="neutral"
                determinate
                variant="solid"
                size="lg"
                value={progressValue} 
                
              >
                <div className='textincircle'>
                  <span>
                    {parseInt(item.value)}
                  </span>
                  <span className='hrline'></span>
                  <span>
                    {parseInt(item.goal)}
                  </span>
                </div>
              </CircularProgress>

              <button
               onClick={() => {
                window.location.href = `/report/${item.name}`
              }}
              >Show Report <FaGreaterThan /></button>

            </div>
          )
        })
      }
    </div>
  )
}

export default Banner1