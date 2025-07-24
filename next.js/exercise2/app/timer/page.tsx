"use server"

const Timer = () => {
    const now = new Date().toLocaleTimeString()
  return (
    <div>
      server time: {now}
    </div>
  )
}

export default Timer
