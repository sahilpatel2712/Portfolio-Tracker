const Error404 = () => {
  return (
    <section className="h-screen flex items-center">
    <div className="container mx-auto text-center">
      <h1 className="text-red-500 text-6xl font-bold">404</h1>
      <h2 className="text-red-500 text-2xl mt-4">
        OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!
      </h2>
      <div className="mt-6">
        <a
          href="/dashboard"
          className="px-6 py-2 rounded-full bg-green-500 text-white text-lg font-medium hover:bg-green-600"
        >
          BACK TO HOMEPAGE
        </a>
      </div>
    </div>
  </section>
  )
}

export default Error404