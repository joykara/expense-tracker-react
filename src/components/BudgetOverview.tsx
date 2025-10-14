import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface BudgetOverviewProps {
    budgeted: number;
    spent: number;
}

export default function BudgetOverview({ budgeted, spent }: BudgetOverviewProps) {
    const saved = budgeted - spent;
    const percent = budgeted ? Math.min((spent / budgeted) * 100, 100) : 0;

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Monthly Budget Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                    <span>Budgeted:</span>
                    <span className="font-medium">${budgeted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Spent:</span>
                    <span className="font-medium">${spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Saved:</span>
                    <span className="font-medium text-green-600">
                        ${saved >= 0 ? saved.toLocaleString() : 0}
                    </span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${percent > 80 ? "bg-red-500" : percent > 50 ? "bg-yellow-400" : "bg-green-500"
                            }`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 text-center">{percent.toFixed(1)}% of budget used</p>
            </CardContent>
        </Card>
    );
}
