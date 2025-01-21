import Summary from '../Summary'
import { Outlet } from 'react-router'

const SummaryLayout = () => {
  return (
    <>
     <Summary />
     <Outlet/>
    </>
  )
}

export default SummaryLayout