import styles from "../styles/Button.module.css"

function Button(props) {
  return (
    <button onClick={() => {
      if (!props.isLoading) {
        props.onClick()
      }
    }} style={{
      cursor: props.isLoading ? "not-allowed" : "pointer"
    }} className={styles.button}>{ 
      props.isLoading ? <div className={styles.loader}></div> : props.children 
    }</button>
  )
}

export default Button