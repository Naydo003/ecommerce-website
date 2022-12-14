import './form-input.styles.scss'

const FormInput = ({label, ...otherProps}) => {


  return (
    <div className='group'>
      <input className='form-input' {...otherProps}></input>
      {label && <label className={`form-input-label ${label && (otherProps.value.length ? 'shrink' : '')}`}>{label}</label>}    {/* this dark magic is short circuit evaluation, if label is false then second expression wont run */}
    </div>

  )

}


export default FormInput