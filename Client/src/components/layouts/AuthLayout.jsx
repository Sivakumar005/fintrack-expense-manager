export const AuthLayout = ({ children }) => {
  return (
    <div className='w-screen h-screen md:w-[60vw] px-12 pt-4'>
      <h2 className='text-lg font-medium text-black mb-4'>Expense Tracker</h2>
      {children}
    </div>
  )
}
