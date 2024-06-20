export const getReports = (data: any[], key: string) => {
    if (data.length === 0 || !key) return;
    return data.filter((task: any) => task.status === key).length
}