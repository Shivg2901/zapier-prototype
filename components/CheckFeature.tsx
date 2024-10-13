
const CheckFeature = ({title}: {title: string}) => {
  return (
    <div className="flex">

  <div className="pr-2 flex flex-col justify-center">
  <CheckMark />
  </div>
  <div>
  {title}
  </div>
  </div>
  )
}

export default CheckFeature

function CheckMark () {
    return <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    className="w-4 h-4"
  >
    <circle cx="8" cy="8" r="7" fill="green" />
    <path
      fill="white"
      fill-rule="evenodd"
      d="M11.844 6.209a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z"
      clip-rule="evenodd"
    />
  </svg>

}