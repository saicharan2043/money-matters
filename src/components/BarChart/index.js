import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from "recharts"
  
  const data = [
    {
      group_name: "Mon",
      debit: 200,
      credit: 400,
    },
    {
      group_name: "Tue",
      debit: 3000,
      credit: 500,
    },
    {
      group_name: "Web",
      debit: 1000,
      credit: 1500,
    },
    {
      group_name: "Thu",
      debit: 700,
      credit: 1200,
    },
  ]
  
  const BarCharts = () => {
    const DataFormatter = (number) => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`
      }
      return number.toString()
    }
  
    return (
      <ResponsiveContainer width="90%" height={450}>
        <BarChart
          data={data}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="group_name"
            tick={{
              stroke: "gray",
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="debit" name="Debit" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="credit" name="Credit" fill="#fd7f0e" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
  
  export default BarCharts