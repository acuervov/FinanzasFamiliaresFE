export default function useGetBalance(accounts) {
    const totalBalance = accounts?.reduce((total, current) => {
        return (total += current.overAllTotal);
    }, 0);

    return { totalBalance };
}
