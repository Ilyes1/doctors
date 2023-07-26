import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { CiEdit } from 'react-icons/ci'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import moment from 'moment';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdAttachMoney } from 'react-icons/md';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db, dbs } from '../firebase';
import { useRef } from 'react';
import { child, get, ref, update } from 'firebase/database';

const Reports = () => {

    const [value, setValue] = useState(moment(Date.now()));

    const [patient, setPatient] = useState('Kyle Walker')
    const [addPatient, setAddPatient] = useState(false)

    const [tab, setTab] = useState(1)

    const days7 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun'],
        days: [40, 60, 25, 38, 45, 60, 38],
    }

    const days30 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun', '18 jun', '21 jun', '24 jun', '27 jun', '30 jun'],
        days: [60, 30, 50, 46, 60, 38, 46, 30, 50, 38, 60, 38]
    }
    
    const edays7 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun'],
        days: [38, 35, 56, 60, 38, 33, 38],
    }

    const edays30 = {
        labels: ['1 Jun', '3 Jun', '6 jun', '9 jun', '12 jun', '12 jun', '15 jun', '18 jun', '21 jun', '24 jun', '27 jun', '30 jun'],
        days: [60, 25, 46, 46, 60, 50, 46, 30, 38, 46, 38, 38]
    }

    const [drop1, setDrop1] = useState({
        days: days7,
        edays: edays7,
        text: 'Last 7 days'
    })

    const [chartIncomes, setChartIncomes] = useState([])
    const [chartExpenses, setChartExpenses] = useState([])
    const [chartDays, setChartDays] = useState([])

    const data = () => {
        return {
            labels: chartDays,
            datasets: [
                {
                    label: 'Incomes',
                    data: chartIncomes,
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
                },
                {
                    label: 'Expenses',
                    data: chartExpenses,
                    borderColor: '#db6565',
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: (context: ScriptableContext<"line">) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, "#e38a8a");
                        gradient.addColorStop(1, "#e38a8a00");
                        return gradient;
                    },
                    tension: 0.2,
                    pointRadius: 0
                }
            ]
        }
      }

      const options = {
        scales: {
            y: {
                min: 0
            }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2
      }



        const cancel1 = useRef()
        const cancel2 = useRef()

        const userId = localStorage.getItem('user')
        const userDoc = child(ref(dbs, "users"), userId);

        const [incomes, setIncomes] = useState([])
        const [expenses, setExpenses] = useState([])

        const [cIncomes, setCIncomes] = useState([])
        const [cExpenses, setCExpenses] = useState([])

        const [amount, setAmount] = useState()
        const [notes, setNotes] = useState('')

        const [eAmount, setEAmount] = useState()
        const [eNotes, setENotes] = useState('')

        const [exist, setExist] = useState('')
        const [exist2, setExist2] = useState('')

        const [totalIncomes, setTotalIncomes] = useState(0)
        const [totalExpenses, setTotalExpenses] = useState(0)

        const [sevenIncomes, setSevenIncomes] = useState(0)
        const [sevenExpenses, setSevenExpenses] = useState(0)

        const [currency, setCurrency] = useState('')

        useEffect(() => {
            get(child(ref(dbs, 'users'), userId))
            .then((snapshot) => {
                setCurrency(snapshot.val().currency.code)
                if (snapshot.val().cIncomes !== undefined) {
                    setCIncomes(snapshot.val().cIncomes)
                    const tti = snapshot.val().cIncomes.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue.amount)
                      }, 0);
                    setTotalIncomes(tti)
                } 
                if (snapshot.val().incomes !== undefined) {
                    setIncomes(snapshot.val().incomes)
                    setExist(true)
                } else {
                    setExist(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }, [])

        useEffect(() => {
            get(child(ref(dbs, 'users'), userId))
            .then((snapshot) => {
                if (snapshot.val().cExpenses !== undefined) {
                    setCExpenses(snapshot.val().cExpenses)
                    const tte = snapshot.val().cExpenses.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue.amount)
                      }, 0);
                    setTotalExpenses(tte)
                }
                if (snapshot.val().expenses !== undefined) {
                    setExpenses(snapshot.val().expenses)


                    setExist2(true)
                } else {
                    setExist2(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }, [])

        useEffect(() => {
            if (incomes.length) {
                update(userDoc, {
                    incomes: incomes
                })
            }
        }, [incomes])

        useEffect(() => {
            if (cIncomes.length) {
                update(userDoc, {
                    cIncomes: cIncomes
                })
            }
        }, [cIncomes])

        useEffect(() => {
            if (expenses.length) {
                update(userDoc, {
                    expenses: expenses
                })
            }
        }, [expenses])

        useEffect(() => {
            if (cExpenses.length) {
                update(userDoc, {
                    cExpenses: cExpenses
                })
            }
        }, [cExpenses])

        const handleAddIncome = () => {
            var date = new Date().toDateString()

            setIncomes([{
                date: date,
                amount: amount,
                notes: notes
            }, ...incomes])

            setCIncomes([{
                date: date,
                amount: amount
            }, ...cIncomes])

            setExist(true)
            setAmount('')
            setNotes('')
            setTotalIncomes(totalIncomes + parseInt(amount))
            cancel1.current.click()
        }

        const handleRemoveIncome = index => {
            const newIncomes = [...incomes];
            newIncomes.splice(index, 1);
            setIncomes(newIncomes);
            if (incomes.length == 1) {
                update(userDoc, {
                    incomes: []
                })
                setExist(false)
            }
        }

        const handleAddExpense = () => {
            var date = new Date().toDateString()
            setExpenses([{
                date: date,
                amount: eAmount,
                notes: eNotes
            }, ...expenses])
            setCExpenses([{
                date: date,
                amount: eAmount
            }, ...cExpenses])

            setExist2(true)
            setEAmount('')
            setENotes('')
            setTotalExpenses(totalExpenses + parseInt(eAmount))
            cancel2.current.click()
        }

        const handleRemoveExpenses = index => {
            const newExpenses = [...expenses];
            newExpenses.splice(index, 1);
            setExpenses(newExpenses);
            if (expenses.length == 1) {
                update(userDoc, {
                    expenses: []
                })
                setExist2(false)
            }
        }



        //////////////////// CHARTS ////////////////////

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        var newDays = []
        var newIncomes = []
        var newExpenses = []

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
            }

        }, [cIncomes, cExpenses])

        useEffect(() => {
            var sevenIn = chartIncomes.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue)
            }, 0);
            setSevenIncomes(sevenIn)
            var sevenEx = chartExpenses.reduce((accumulator, currentValue) => {
                return accumulator + parseInt(currentValue)
            }, 0);
            setSevenExpenses(sevenEx)
        }, [chartIncomes, chartExpenses])


  return (
    <div className='container my-5'>

        <div className="dash-heading-container d-flex align-items-center justify-content-between flex-wrap mb-2">
            <h3 className='dash-heading mb-2 me-4'>Reports</h3>
        </div>

        <div className="row">

            <div className="col-lg-8 mt-4">
                <h5 className='dash-headline'>Incomes & Expenses</h5>
                <div className="dash-card">
                    <div className="d-flex justify-content-between mb-3">
                        <h6 className='chart-top-left'>
                            Expenses: <span className='text-danger'>{sevenExpenses} {currency}</span> <br />
                            Incomes: <span className='text-primary'>{sevenIncomes} {currency}</span> <br />
                            Profit: <span className='text-success'>{sevenIncomes - sevenExpenses} {currency}</span>
                        </h6>
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
                                <li onClick={() => setDrop1({days: days7, edays: edays7, text: 'Last 7 days'})}>Last 7 days</li>
                                <li onClick={() => setDrop1({days: days30, edays: edays30, text: 'Last 30 days'})}>Last 30 days</li>
                            </ul>
                        </div> */}
                        {/* <h6>Last</h6> */}
                    </div>
                    <Line data={data()} className='w-100' options={options} />
                </div>
            </div>
            <div className="col-lg-4 mt-4">
                <h5 className='dash-headline'>Stats</h5>
                <div className="widget">
                    <div className="widget-img bg-soft-success text-success">
                        <MdAttachMoney />
                    </div>
                    <div className="widget-text">
                        <h6>Total profit</h6>
                        <h2>{totalIncomes - totalExpenses} {currency}</h2>
                    </div>
                </div>
                <div className="widget mt-3">
                    <div className="widget-img bg-soft-primary text-primary">
                        <GiReceiveMoney />
                    </div>
                    <div className="widget-text">
                        <h6>Total incomes</h6>
                        <h2>{totalIncomes} {currency}</h2>
                    </div>
                </div>
                <div className="widget mt-3">
                    <div className="widget-img bg-soft-danger text-danger">
                        <GiPayMoney />
                    </div>
                    <div className="widget-text">
                        <h6>Total expenses</h6>
                        <h2>{totalExpenses} {currency}</h2>
                    </div>
                </div>
            </div>

        </div>

        <div className="dash-card mt-4">

            <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="table-tabs mb-3">
                    <button className={tab === 1 && 'active'} onClick={() => setTab(1)}>Incomes</button>
                    <button className={tab === 2 && 'active'} onClick={() => setTab(2)}>expenses</button>
                </div>
                <div className="mb-3">
                    {tab === 1 && <button className='primary-btn rounded-3' data-bs-toggle="modal" data-bs-target="#incomeModal">+ Add Income</button>}
                    {tab === 2 && <button className='primary-btn rounded-3' data-bs-toggle="modal" data-bs-target="#expenseModal">+ Add Expense</button>}
                </div>
            </div>

            {
                tab === 1 && exist === '' && (
                    <div className="d-flex justify-content-center my-4">
                        <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                    </div>
                )
            }
            {
                tab === 1 && exist === true && (
                    <div className="table-responsive">
                        <table className="table dash-table">
                            <thead>
                                <tr>
                                    <td>Date</td>
                                    <td>Amount</td>
                                    <td>Notes</td>
                                    <td className='text-center'>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    incomes.map((income, index) => (
                                        <tr key={index}>
                                            <td className='app-date'>
                                                {income.date}
                                            </td>
                                            <td className='app-date text-success'>
                                                {income.amount} {currency}
                                            </td>
                                            <td>
                                                <p className='app-reason mb-0'>
                                                    {income.notes}
                                                </p>
                                            </td>
                                            <td>
                                                <div className='app-action d-flex justify-content-center'>
                                                    <button onClick={() => handleRemoveIncome(index)} className='text-danger bg-soft-danger'>
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                tab === 1 && exist === false && (
                    <div className="empty">
                        <img src="../../assets/img/empty-reports.png" alt="" />
                        <p>
                            No incomes added yet. <br />
                            <Link to={'#'} data-bs-toggle="modal" data-bs-target="#incomeModal">Add</Link> your first income now!
                        </p>
                    </div>
                )
            }
            {
                tab === 2 && exist2 === '' && (
                    <div className="d-flex justify-content-center my-4">
                        <img src="../../assets/img/loader.gif" className='loader-img' alt="" />
                    </div>
                )
            }
            {
                tab === 2 && exist2 === true && (
                    <div className="table-responsive">
                        <table className="table dash-table">
                            <thead>
                                <tr>
                                    <td>Date</td>
                                    <td>Amount</td>
                                    <td>Notes</td>
                                    <td className='text-center'>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    expenses.map((expense, index) => (
                                        <tr key={index}>
                                            <td className='app-date'>
                                                {expense.date}
                                            </td>
                                            <td className='app-date text-danger'>
                                                {expense.amount} {currency}
                                            </td>
                                            <td>
                                                <p className='app-reason mb-0'>
                                                    {expense.notes}
                                                </p>
                                            </td>
                                            <td>
                                                <div className='app-action d-flex justify-content-center'>
                                                    <button onClick={() => handleRemoveExpenses(index)} className='text-danger bg-soft-danger'>
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            {
                tab === 2 && exist2 === false && (
                    <div className="empty">
                        <img src="../../assets/img/empty-reports.png" alt="" />
                        <p>
                            No expenses added yet. <br />
                            <Link to={'#'} data-bs-toggle="modal" data-bs-target="#expenseModal">Add</Link> your first expense.
                        </p>
                    </div>
                )
            }
        </div>



        {/* ////////// MODAL ////////// */}
        <div
            className="modal fade"
            id="incomeModal"
            tabIndex={-1}
            aria-labelledby="incomeModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Add Income</h5>

                        <div className="row">
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Amount</label>
                                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='modal-input' />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Notes</label>
                                    <textarea className='modal-textarea' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                                
                        <div className="row">
                            <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                                <button className='modal-cancel me-2' ref={cancel1} data-bs-dismiss='modal'>Cancel</button>
                                <button className='modal-save' onClick={handleAddIncome}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div
            className="modal fade"
            id="expenseModal"
            tabIndex={-1}
            aria-labelledby="expenseModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog">
                <div className="modal-content dash-modal">
                    <div className="modal-body">
                        <h5 className='modal-heading'>Add Expense</h5>

                        <div className="row">
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Amount</label>
                                    <input type="number" value={eAmount} onChange={(e) => setEAmount(e.target.value)} className='modal-input' />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="modal-field">
                                    <label>Notes</label>
                                    <textarea className='modal-textarea' value={eNotes} onChange={(e) => setENotes(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                                
                        <div className="row">
                            <div className="col-12 mt-4 d-flex align-items-center justify-content-end">
                                <button className='modal-cancel me-2' ref={cancel2} data-bs-dismiss='modal'>Cancel</button>
                                <button className='modal-save' onClick={handleAddExpense}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default Reports