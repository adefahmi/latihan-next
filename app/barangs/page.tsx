import AddBarang from "./addBarang";
import DeleteBarang from "./deleteBarang";
import EditBarang from "./editBarang";

// type barang
type Barang = {
    id: number;
    nama: string;
    harga: number;
}

// fetch data from api
async function getBarangs() {
    const res = await fetch('http://localhost:5000/barangs', {
        cache: 'no-cache',
    });
    return res.json()

}

export default async function Barang() {
    const barangs: Barang[] = await getBarangs();

    return (
        <>
            <div className="w-full mb-4 py-4 text-center">
                <h1 className="text-3xl font-bold">
                    Daftar Barang
                </h1>
            </div>
            <div className="overflow-x-auto py-10 px-10">
                <div className="py-2">
                    <AddBarang />
                </div>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barangs.map((barang) => (
                            <tr key={barang.id}>
                                <td></td>
                                <td>{barang.id}</td>
                                <td>{barang.nama}</td>
                                <td>{barang.harga}</td>
                                <td className="flex gap-2">
                                    <DeleteBarang {...barang} />
                                    <EditBarang {...barang} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
};
