'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteBarang(barang: any) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleDelete(barangId: number) {
        setIsMutating(true);

        const res = await fetch(`http://localhost:5000/barangs/${barangId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // wait 1 second
        await new Promise(resolve => setTimeout(resolve, 500));

        const barang = await res.json();

        if (barang) {
            router.refresh();

            setIsMutating(false);
        }

    }

    function toggleModal() {
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={toggleModal} >Delete</button>

            <input type="checkbox" className="modal-toggle" checked={modal} onChange={toggleModal} />
 
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Apakah anda yakin ingin menghapus barang {barang.nama}?
                    </h3>
                    <div className="modal-action">
                        <button type='button' className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                        {!isMutating ? (
                            <button type='button'
                                onClick={() => handleDelete(barang.id)}
                            className="btn btn-primary">Delete</button>
                        ) : (
                            <button type='button' className="btn btn-disabled">Deleting</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};
