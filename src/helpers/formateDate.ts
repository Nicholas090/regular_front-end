const formatDate = (dateString: string) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    // @ts-ignore
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default formatDate;
