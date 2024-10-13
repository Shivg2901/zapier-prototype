"use client"
import Appbar from "@/components/Appbar"
import DarkButton from "@/components/buttons/DarkButton"
import { useEffect, useState } from "react"
import { BACKEND_URL, HOOKS_URL } from "../config";
import axios from "axios";
import LinkButton from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    id: string;
    triggerId: string;
    userId: number;
    actions: [{
        id: string;
        zapId: string;
        actionId: string;
        sortingOrder: number;
        type: {
            id: string;
            name: string;
            image: string;
        }
    }];         
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        type: {
            id: string;
            name: string;
            image: string;
        }
    };
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token") 
            }
        })
            .then((res) => {
                setZaps(res.data.zaps);
                setLoading(false);
            });
    }, []);

    return { loading, zaps };
}

const Dashboard = () => {
    const {loading, zaps} = useZaps();
    const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
        <Appbar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <div className="flex justify-between pr-8 items-center">
                    <div className="text-3xl font-semibold text-gray-800">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => router.push("/zap/create")}>
                        Create New Zap
                    </DarkButton>
                </div>
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center mt-8">
                <ZapTableLoading /> {/* Display loading placeholders */}
            </div>
        ) : (
            <div className="flex justify-center mt-8">
                <ZapTable zaps={zaps}/> {/* Make sure ZapTable is defined */}
            </div>
        )}
    </div>
  )
}

// Define the ZapTable component here
function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return (
        <div className="p-8 max-w-screen-lg w-full bg-white shadow-lg rounded-lg">
            <div className="grid grid-cols-5 text-lg font-medium text-gray-700 border-b pb-4 mb-4">
                <div>Name</div>
                <div>ID</div>
                <div>Created On</div>
                <div>Webhook URL</div>
                <div>Action</div>
            </div>
            
            {zaps.map(z => (
                <div key={z.id} className="grid grid-cols-5 py-4 items-center text-gray-600 hover:bg-gray-50 transition-all duration-200 ease-in-out">
                    <div className="flex items-center space-x-2">
                        <img src={z.trigger.type.image} width={30} alt="Trigger" />
                        <div className="flex space-x-1">
                            {z.actions.map(x => (
                                <img key={x.id} src={x.type.image} width={30} alt="Action" />
                            ))}
                        </div>
                    </div>
                    <div className="text-sm">{z.id}</div>
                    <div className="text-sm">Nov 13</div>
                    <div className="text-sm truncate">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
                    <div>
                        <LinkButton onClick={() => router.push("/zap/" + z.id)}>Go</LinkButton>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Define the ZapTableLoading component here for loading state
function ZapTableLoading() {
    return (
        <div className="p-8 max-w-screen-lg w-full bg-white shadow-lg rounded-lg animate-pulse">
            <div className="grid grid-cols-5 text-lg font-medium text-gray-300 border-b pb-4 mb-4">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
            </div>
            
            {/* Placeholder rows */}
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-5 py-4 items-center text-gray-300">
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                    <div className="h-6 bg-gray-300 rounded w-16"></div>
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-6 bg-gray-300 rounded w-40"></div>
                    <div className="h-6 bg-gray-300 rounded w-10"></div>
                </div>
            ))
            }
        </div>
    )
}

export default Dashboard;
