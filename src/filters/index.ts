export function statusFilter(status: string) {
    let statusMap = {
      published: 'success',
      draft: 'gray',
      deleted: 'danger'
    }
    return (statusMap as { [key: string ]: string })[status]
}