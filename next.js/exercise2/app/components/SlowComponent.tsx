"use server"

const SlowComponent = async() => {
    await new Promise((r) => setTimeout(r, 2000));
  return (
    <div>
      after 5 seconds
    </div>
  )
}

export default SlowComponent
