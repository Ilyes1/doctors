import React, { useState } from 'react'
import { MdAttachMoney } from 'react-icons/md'
import { TbCheck } from 'react-icons/tb'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, dbs } from '../firebase'
import { useEffect } from 'react'
import { child, get, ref, set, update } from 'firebase/database'

const Panel = () => {

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

    const [chartApps, setChartApps] = useState([])
    const [chartDays, setChartDays] = useState([])

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
        scales: {
            y: {
                min: 0
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2
      }


    //////////////////////////////////////////////////
    //////////////////// BACKEND /////////////////////
    //////////////////////////////////////////////////

    const userId = localStorage.getItem('user')
    const userDoc = child(ref(dbs, "users"), userId);

    const [todos, setTodos] = useState([])
    const [currency, setCurrency] = useState('')
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalAppointments, setTotalAppointments] = useState(0)
    const [totalPatients, setTotalPatients] = useState(0)
    const [apps, setApps] = useState([])
    const [todayApps, setTodayApps] = useState([])
    const [appExist, setAppExist] = useState('')
    const [medExist, setMedExist] = useState('')
    const [medicines, setMedicines] = useState([])
    const [notifications, setNotifiations] = useState([])

    const [sevenApps, setSevenApps] = useState(0)
    const [cApps, setCApps] = useState([])

    const date = new Date().toDateString()

    useEffect(() => {
        get(child(ref(dbs, 'users'), userId))
        .then((snapshot) => {

            setCurrency(snapshot.val().currency.code)

            setTotalAppointments(snapshot.val().tApps)

            setTotalPatients(snapshot.val().tPatients)

            if (snapshot.val().cIncomes !== undefined) {

                const tti = snapshot.val().cIncomes.reduce((accumulator, currentValue) => {
                    return accumulator + parseInt(currentValue.amount)
                  }, 0);
                setTotalIncomes(tti)

            } else {
                //
            }
            if (snapshot.val().cExpenses !== undefined) {

                const tte = snapshot.val().cExpenses.reduce((accumulator, currentValue) => {
                    return accumulator + parseInt(currentValue.amount)
                  }, 0);
                setTotalExpenses(tte)

            } else {
                //
            }

            if (snapshot.val().appointments !== undefined) {

                setApps(snapshot.val().appointments)
                setTodayApps(
                    snapshot.val().appointments.filter(app => app.date === date && app.status === 'scheduled')
                )
                
            } else {
                setAppExist(false)
            }
            
            if (snapshot.val().cAppointments !== undefined) {
                setCApps(snapshot.val().cAppointments)
            } else {
                //
            }

            if (snapshot.val().todos !== undefined) {
                setTodos(snapshot.val().todos)
            } else {
                // setTodos([])
            }

            if (snapshot.val().medicines !== undefined) {
                setMedicines(snapshot.val().medicines)
                setMedExist(true)
            } else {
                setMedExist(false)
            }

            if (snapshot.val().notifications !== undefined) {
                setNotifiations(snapshot.val().notifications)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (todos.length) {
            update(userDoc, {
                todos: todos
            })
        }
    }, [todos])
    
    useEffect(() => {
        if (apps.length) {
            update(userDoc, {
                appointments: apps
            })
        }
    }, [apps])

    useEffect(() => {
        if (todayApps.length) {
            setAppExist(true)
        } else {
            setAppExist(false)
        }
    }, [todayApps])
    
    useEffect(() => {
        if (medicines.length) {
            update(userDoc, {
                medicines: medicines
            })
        }
    }, [apps])



    
    ///////////////////// TODOS //////////////////////
    const [todo, setTodo] = useState('')
    const addTodo = (e) => {
        e.preventDefault()
        setTodos([...todos, {text: todo, checked: false}])
        setTodo('')
    }

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        if (todos.length == 1) {
            updateDoc(userDoc, {
                todos: []
            })
        }
    }

    const checkTodo = index => {
        const newTodos = [...todos];
        newTodos[index].checked = !newTodos[index].checked;
        setTodos(newTodos);
    };

    const handleRemoveApp = index => {
        const newApps = [...apps];
        newApps.splice(index, 1);
        setApps(newApps);
        if (apps.length == 1) {
            update(userDoc, {
                appointments: []
            })
            setAppExist(false)
        }
        if (todayApps.length == 1) {
            setAppExist(false)
        }
    }

    const handleRemoveMed = index => {
        const newMedicines = [...medicines];
        newMedicines.splice(index, 1);
        setMedicines(newMedicines);
        if (medicines.length == 1) {
            update(userDoc, {
                medicines: []
            })
            setMedExist(false)
        }
    }



    //////////////////// CHARTS ////////////////////

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    var newDays = []
    var newApps = []

    useEffect(() => {
        var today = new Date()
        for (let i = 6; i >= 0; i--) {
            const prevDay = new Date(today.getTime() - i * 86400000)
            const currentDay = `${prevDay.getDate()} ${months[prevDay.getMonth()]}`

            newDays.push(currentDay)
            setChartDays(newDays)

            const todayApps = cApps.filter(app => app.date === prevDay.toDateString())

            if (todayApps.length !== []) {
                const dayTotal = todayApps.reduce((accumulator, currentValue) => {
                    return accumulator + 1
                }, 0);
                newApps.push(dayTotal)
                setChartApps(newApps)
            }
        }

    }, [cApps])

    useEffect(() => {
        var sevenApp = chartApps.reduce((accumulator, currentValue) => {
            return accumulator + parseInt(currentValue)
        }, 0);
        setSevenApps(sevenApp)
    }, [chartApps])


  return (
    <div className='container my-5'>
        
        <h3 className='dash-heading'>Dashboard</h3>

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

        <div className="mt-4 w-100 upgrade-banner">
            <h4>Subscribe Now!</h4>
            <h5>Upgrade your membership and take control of your healthcare journey.</h5>
            <Link to={'/pricing'} className='upgrade-btn'>
                <img src="../../assets/icons/premium.png" alt="" />
                Subscribe
            </Link>
        </div>

        <div className="row mt-4">
            <div className="col-lg-6 mt-4">
                <h5 className='dash-headline'>Today Appointments</h5>
                <div className="dash-card">
                {
                    appExist === '' && (
                        <div className="h-100 d-flex align-items-center justify-content-center mb-5">
                            <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                        </div>
                    )
                }
                {
                    appExist && (
                        <div className="today-apps">
                            {
                                apps.map((app, index) => (
                                    <div className="today-app" key={index} hidden={app.date !== date || app.status !== 'scheduled' ? true : false}>
                                        <div className="today-app-left">
                                            <h6>{app.patientName}</h6>
                                            <p>{app.reason}</p>
                                        </div>
                                        <div className="today-app-right">
                                            <button onClick={() => handleRemoveApp(index)} className='text-danger bg-soft-danger'>
                                                <IoClose />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                {
                    appExist === false && (
                        <div className="empty">
                            <img src="../../assets/img/empty-app.png" alt="" />
                            <p>
                                No appointments scheduled for today. <br />
                                Add your first one from <Link to={'/dashboard/appointments'}>appointments</Link> page.
                            </p>
                        </div>
                    )
                }

                </div>
            </div>
            <div className="col-lg-6 mt-4">
                <h5 className='dash-headline'>Todo List</h5>
                <div className="dash-card todos-card">
                    <form className="todo-field" onSubmit={addTodo}>
                        <input type="text" placeholder='Add todo' value={todo} onChange={(e) => setTodo(e.target.value)} required />
                        <button>
                            <AiOutlinePlus />
                        </button>
                    </form>
                    <div className="todos">
                        {
                            todos.map((todo, index) => (
                                <div className="todo" key={index}>
                                    <div className="todo-left">
                                        <input 
                                            type="checkbox" 
                                            className='form-check-input' 
                                            checked={todo.checked}
                                            onChange={() => checkTodo(index)}
                                        />
                                        <h6>{todo.text}</h6>
                                    </div>
                                    <button onClick={() => removeTodo(index)} className='todo-btn text-danger bg-soft-danger'>
                                        <IoClose />
                                    </button>
                                </div>
                            ))
                        }
                        {/* <div className="todo">
                            <div className="todo-left">
                                <input type="checkbox" className='form-check-input' />
                                <h6>Update patient records</h6>
                            </div>
                            <button className='todo-btn text-danger bg-soft-danger'>
                                <IoClose />
                            </button>
                        </div>
                        <div className="todo">
                            <div className="todo-left">
                                <input type="checkbox" className='form-check-input' />
                                <h6>Update patient records</h6>
                            </div>
                            <button className='todo-btn text-danger bg-soft-danger'>
                                <IoClose />
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-lg-8 mt-4">
                <h5 className='dash-headline'>Appointments Activity</h5>
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
                    <Line data={data()} className='w-100' options={options} />
                </div>
            </div>
            <div className="col-lg-4 mt-4">
                <h5 className='dash-headline'>Medicines</h5>
                <div className="dash-card d-flex flex-column">
                    {
                        medExist === '' && (
                            <div className="h-100 d-flex align-items-center justify-content-center mb-5">
                                <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                            </div>
                        )
                    }
                    {
                        medExist === true && (
                            <div className="medicines">
                                {
                                    medicines.map((medicine, index) => (
                                        <div className="medicine" key={index}>
                                            <h6>{medicine.name}</h6>
                                            <button onClick={() => handleRemoveMed(index)} className='todo-btn text-danger bg-soft-danger'>
                                                <IoClose />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    {
                        medExist === false && (
                            <div className="empty">
                                <img src="../../assets/img/empty-medicines.png" alt="" />
                                <p>
                                    No medicines added yet. <br />
                                    Add your first one from <Link to={'/dashboard/medicines'}>medicines</Link> page.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

export default Panel