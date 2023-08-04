'use client'
import { SyntheticEvent, useState } from 'react';
// router
import { useRouter } from 'next/navigation'

type Barang = {
    id: number;
    nama: string;
    harga: number;
}

export default function EditBarang(barang: Barang) {
    const [modal, setModal] = useState(false);
    const [nama, setNama] = useState(barang.nama);
    const [harga, setHarga] = useState(barang.harga);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent, barangId: number) {
        e.preventDefault();

        setIsMutating(true);

        const res = await fetch(`http://localhost:5000/barangs/${barangId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama,
                harga
            })
        });

        // wait 1 second
        await new Promise(resolve => setTimeout(resolve, 300));

        const barang = await res.json();

        if (barang) {
            setModal(false);

            router.refresh();

            setIsMutating(false);
        }

    }

    function toggleModal() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={toggleModal} >Edit</button>

            <input type="checkbox" className="modal-toggle" checked={modal} onChange={toggleModal} />
 
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Form Tambah Barang</h3>
                    <form
                        onSubmit={(e) => handleSubmit(e, barang.id)}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nama Barang</span>
                            </label>
                            <input type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)} 
                                placeholder="Nama Barang" 
                                className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Harga Barang</span>
                            </label>
                            <input type="number"
                                value={harga}
                                onChange={(e) => setHarga(parseInt(e.target.value))}
                                placeholder="Harga Barang" className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <button type='button' className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                            {!isMutating ? (
                                <button type='submit' className="btn btn-primary">Update</button>
                            ) : (
                                <button type='button' className="btn btn-disabled">Saving</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};
