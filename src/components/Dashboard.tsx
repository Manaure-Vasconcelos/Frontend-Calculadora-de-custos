export default function Dashboard() {
	return (
		<div className="border border-gray-300 rounded-lg p-4 w-80 mx-auto flex flex-col justify-center items-center">
			<h1 className="text-xl font-bold p-4">Dashboard</h1>
			<ul className="flex-row">
				<li>All Recipes</li>
				<li>Fixed Costs</li>
				<li>Calculate a new value => recipe and product</li>
			</ul>
		</div>
	);
}
/* w-80 h-80 mx-auto flex flex-col justify-center items-center */