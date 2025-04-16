import img from '../../media/spinner.svg'

export default function Spinner(){
    return <div>
        <img src={img} alt="load-spinner" className='animate-spin' />
    </div>
}