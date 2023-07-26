import React, { useEffect, useState } from 'react'
import { MdAttachMoney } from 'react-icons/md'
import { TbCheck } from 'react-icons/tb'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Doughnut } from 'react-chartjs-2';
import { doc, getDoc } from 'firebase/firestore'
import { db, dbs } from '../firebase'
import { child, get, ref } from 'firebase/database'

const Analytics = () => {

    const days7 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun'],
        days: [40, 46, 25, 10, 50, 60, 38],
    }

    const days30 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun', '18 jun', '21 jun', '24 jun', '27 jun', '30 jun'],
        days: [60, 30, 50, 46, 60, 38, 46, 30, 50, 38, 60, 38]
    }
    
    const edays7 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun'],
        days: [40, 46, 25, 10, 50, 60, 38],
    }

    const edays30 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun', '18 jun', '21 jun', '24 jun', '27 jun', '30 jun'],
        days: [60, 30, 50, 46, 60, 38, 46, 30, 50, 38, 60, 38]
    }

    const [drop1, setDrop1] = useState({
        days: days7,
        text: 'Last 7 days'
    })

    const [drop2, setDrop2] = useState({
        days: edays7,
        text: 'Last 7 days'
    })



    const [chartIncomes, setChartIncomes] = useState([])
    const [chartExpenses, setChartExpenses] = useState([])
    const [chartEarnings, setChartEarnings] = useState([])
    const [chartDays, setChartDays] = useState([])

    const [chartApps, setChartApps] = useState([])
    
    const data = () => {
        return {
            labels: chartDays,
            datasets: [{
                label: 'Appointments',
                data: chartApps,
                borderColor: '#55b7dd',
                borderWidth: 3,
                fill: true,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "#c9e9f6");
                    gradient.addColorStop(1, "#c9e9f600");
                    return gradient;
                },
                tension: 0.2,
                pointRadius: 0
            }]
        }
      }

      const options = {
        plugins: {
          legend: {
            display: false
          }
        },
        // scales: {
        //     y: {
        //         min: 0
        //     }
        // },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2
      }

      const options2 = {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
            y: {
                min: 0
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2
      }
    
      const data1 = () => {
        return {
            labels: chartDays,
            datasets: [{
                label: 'Earnings',
                data: chartEarnings,
                borderColor: '#84c288',
                borderWidth: 3,
                fill: true,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "#bdd9bf");
                    gradient.addColorStop(1, "#bdd9bf21");
                    return gradient;
                },
                tension: 0.2,
                pointRadius: 0
            }]
        }
      }



      const [males, setMales] = useState(0)
      const [females, setFemales] = useState(0)
      const [ages, setAges] = useState([])

      const genderData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                label: 'Total',
                data: [males, females],
                backgroundColor: ['#c9e9f6', '#6b3272a8']
            }
        ]
      }


      const ageData = {
        labels: ['0-12', '13-25', '26-39', '40-65', '+65'],
        datasets: [
            {
                label: 'Total',
                data: ages,
                backgroundColor: ['#c9e9f6', '#d9af71', '#71d98b', '#cfd971', '#d97171']
            }
        ]
      }



        const userId = localStorage.getItem('user')
        const userDoc = child(ref(dbs, "users"), userId);

        const [patients, setPatients] = useState([])
        const [currency, setCurrency] = useState('')
        const [totalIncomes, setTotalIncomes] = useState(0)
        const [totalExpenses, setTotalExpenses] = useState(0)
        const [totalAppointments, setTotalAppointments] = useState(0)
        const [totalPatients, setTotalPatients] = useState(0)

        const [exist, setExist] = useState('')
        const [ageExist, setAgeExist] = useState('')

        const [cIncomes, setCIncomes] = useState([])
        const [cExpenses, setCExpenses] = useState([])

        const [sevenEarnings, setSevenEarnings] = useState(0)

        const [sevenApps, setSevenApps] = useState(0)
        const [cApps, setCApps] = useState([])
        
        const countByGender = (objects, gender) => {
            return objects.filter(object => object.gender === gender).length;
        };
        
        const countByAge = (objects, min, max) => {
            return objects.filter(object => min <= parseInt(object.age) && parseInt(object.age) <= max).length;
        };
        
        useEffect(() => {
            get(child(ref(dbs, 'users'), userId))
            .then((snapshot) => {

                setCurrency(snapshot.val().currency.code)

                setTotalAppointments(snapshot.val().tApps)

                setTotalPatients(snapshot.val().tPatients)

                if (snapshot.val().patients !== undefined) {
                setPatients(snapshot.val().patients)
                    setExist(true)
                    setAgeExist(true)
                } else {
                    setExist(false)
                    setAgeExist(false)
                }

                if (snapshot.val().cAppointments !== undefined) {
                    setCApps(snapshot.val().cAppointments)
                } else {
                    //
                }

                if (snapshot.val().cIncomes !== undefined) {
                    setCIncomes(snapshot.val().cIncomes)
                    const tti = snapshot.val().cIncomes.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue.amount)
                      }, 0);
                    setTotalIncomes(tti)
                } 
                if (snapshot.val().cExpenses !== undefined) {
                    setCExpenses(snapshot.val().cExpenses)
                    const tte = snapshot.val().cExpenses.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue.amount)
                      }, 0);
                    setTotalExpenses(tte)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }, [])

        useEffect(() => {
            setMales(countByGender(patients, 'Male'))
            setFemales(countByGender(patients, 'Female'))
            setAges([
                countByAge(patients, 0, 12),
                countByAge(patients, 13, 25),
                countByAge(patients, 26, 39),
                countByAge(patients, 40, 65),
                countByAge(patients, 66, Infinity),
            ])
        }, [patients])







        //////////////////// CHARTS ////////////////////

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        var newDays = []
        var newIncomes = []
        var newExpenses = []
        var newEarnings = []
        var newApps = []

        useEffect(() => {
            var today = new Date()
            for (let i = 6; i >= 0; i--) {
                const prevDay = new Date(today.getTime() - i * 86400000)
                const currentDay = `${prevDay.getDate()} ${months[prevDay.getMonth()]}`

                newDays.push(currentDay)
                setChartDays(newDays)

                const todayIncomes = cIncomes.filter(income => income.date === prevDay.toDateString())
                const todayExpenses = cExpenses.filter(expense => expense.date === prevDay.toDateString())

                if (todayIncomes.length !== []) {
                    const dayTotal = todayIncomes.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue.amount)
                    }, 0);
                    newIncomes.push(dayTotal)
                    setChartIncomes(newIncomes)
                } 

                if (todayExpenses.length !== []) {
                    const dayTotal = todayExpenses.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue.amount)
                    }, 0);
                    newExpenses.push(dayTotal)
                    setChartExpenses(newExpenses)
                } 

                const todayApps = cApps.filter(app => app.date === prevDay.toDateString())

                if (todayApps.length !== []) {
                    const dayTotal = todayApps.reduce((accumulator, currentValue) => {
                        return accumulator + 1
                    }, 0);
                    newApps.push(dayTotal)
                    setChartApps(newApps)
                }
            }

        }, [cIncomes, cExpenses, cApps])

        useEffect(() => {
            for (let i = 0; i < chartIncomes.length; i++) {
                const dayEarning = chartIncomes[i] - chartExpenses[i];
                newEarnings.push(dayEarning)
                setChartEarnings(newEarnings)
            }
        }, [chartIncomes, chartExpenses])
        
        useEffect(() => {
            var sevenEarn = chartEarnings.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue)
            }, 0);
            setSevenEarnings(sevenEarn)
            
        }, [chartEarnings])

        useEffect(() => {
            var sevenApp = chartApps.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue)
            }, 0);
            setSevenApps(sevenApp)
        }, [chartApps])




  return (
    <div className='container my-5'>
        
        <h3 className='dash-heading'>Analytics</h3>

        <div className="row">
            
        <div className="col-lg-4 mt-3">
                <div className="widget">
                    <div className="widget-img bg-soft-success text-success">
                        <MdAttachMoney />
                    </div>
                    <div className="widget-text">
                        <h6>Total earnings</h6>
                        <h2>{totalIncomes - totalExpenses} {currency}</h2>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mt-3">
                <div className="widget">
                    <div className="widget-img bg-soft-primary text-primary">
                        <img src="../../assets/icons/appointmentsBlue.svg" alt="" />
                    </div>
                    <div className="widget-text">
                        <h6>Total appointments</h6>
                        <h2>{totalAppointments}</h2>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mt-3">
                <div className="widget">
                    <div className="widget-img bg-soft-warning text-warning">
                        <img src="../../assets/icons/patientsYellow.svg" alt="" />
                    </div>
                    <div className="widget-text">
                        <h6>Total patients</h6>
                        <h2>{totalPatients}</h2>
                    </div>
                </div>
            </div>

        </div>

        <div className="row">
            <div className="col-lg-8 mt-5">
                <h5 className='dash-headline'>Earnings over Time</h5>
                <div className="dash-card">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className='chart-top-left'>Total: {sevenEarnings} {currency}</h6>
                        {/* <div className="dropdown chart-dropdown">
                            <button
                                className="btn shadow-none"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {drop2.text}
                                <img src="../../assets/icons/down.png" alt="" />
                            </button>
                            <ul className="dropdown-menu">
                                <li onClick={() => setDrop2({days: edays7, text: 'Last 7 days'})}>Last 7 days</li>
                                <li onClick={() => setDrop2({days: edays30, text: 'Last 30 days'})}>Last 30 days</li>
                            </ul>
                        </div> */}
                    </div>
                    <Line data={data1()} className='w-100' options={options} />
                </div>
            </div>
            <div className="col-lg-4 mt-5">
                <h5 className='dash-headline'>Genders</h5>
                <div className="dash-card">
                    {
                        exist === '' && (
                            <div className="h-100 d-flex align-items-center justify-content-center my-4">
                                <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                            </div>
                        )
                    }
                    {
                        exist === true && (
                            <Doughnut data={genderData} />
                            )
                        }
                    {
                        exist === false && (
                            <div className="empty">
                                <img src="../../assets/img/empty-patients.png" alt="" />
                                <p>
                                    You need to <Link to={'/dashboard/patients'}>Add </Link> patients for displaying gender stats.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="col-lg-4 mt-5">
                <h5 className='dash-headline'>Ages</h5>
                <div className="dash-card">
                    {
                        ageExist === '' && (
                            <div className="h-100 d-flex align-items-center justify-content-center my-4">
                                <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                            </div>
                        )
                    }
                    {
                        ageExist === true && (
                                <Doughnut data={ageData} />
                        )
                    }
                    {
                        ageExist === false && (
                            <div className="empty">
                                <img src="../../assets/img/empty-patients.png" alt="" />
                                <p>
                                    You need to <Link to={'/dashboard/patients'}>Add </Link> patients for displaying age stats.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="col-lg-8 mt-5">
                <h5 className='dash-headline'>Appointments</h5>
                <div className="dash-card">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className='chart-top-left'>Total: {sevenApps}</h6>
                        {/* <div className="dropdown chart-dropdown">
                            <button
                                className="btn shadow-none"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {drop1.text}
                                <img src="../../assets/icons/down.png" alt="" />
                            </button>
                            <ul className="dropdown-menu">
                                <li onClick={() => setDrop1({days: days7, text: 'Last 7 days'})}>Last 7 days</li>
                                <li onClick={() => setDrop1({days: days30, text: 'Last 30 days'})}>Last 30 days</li>
                            </ul>
                        </div> */}
                    </div>
                    <Line data={data()} className='w-100' options={options2} />
                </div>
            </div>
        </div>

    </div>
  )
}

export default Analytics