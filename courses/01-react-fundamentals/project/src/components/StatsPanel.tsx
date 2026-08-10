interface StatsPanelProps {
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completedPercentage?: number
}

export default function StatsPanel({ total, completed, active, overdue, completedPercentage }: StatsPanelProps) {
  return (
    <>
      <div id="stats-panel">
        <div>Total: {total} Tasks</div>
        <div>Completed: {completed} Tasks</div>
        <div>Active: {active} Tasks</div>
        <div>OverDue: {overdue} Tasks</div>
        <div role="progressbar">{completedPercentage?.toFixed(0)} %</div>
      </div>
    </>
  );
}
