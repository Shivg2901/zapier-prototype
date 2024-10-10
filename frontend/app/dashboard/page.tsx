"use client"
import Appbar from "@/components/Appbar"
import DarkButton from "@/components/buttons/DarkButton"
import { useEffect, useState } from "react"
import { BACKEND_URL, HOOKS_URL } from "../config";
import axios from "axios";
import LinkButton from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string
    "triggerId": string,
    "userId": number,
    "actions": [{
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string,
            "image": string
            }
    }],         
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
            }
        }
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
                setZaps(res.data.zaps)
                setLoading(false)
            })
    }, [])

    return ({
        loading, zaps
    })
}

const Dashboard = () => {
    const {loading, zaps} = useZaps()
    const router = useRouter()
    const now = new Date();
    
    const date = { month: "short", day: "2-digit" };

    const formattedDate = now
      .toLocaleDateString("en-US", date)
      .replace(",", "");


  return (
    <div>
        <Appbar />
        <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
            <div className="flex justify-between pr-8 ">
                <div className="text-2xl font-bold">
                    My Zaps
                </div>
                <DarkButton onClick={() => {
                    router.push("/zap/create")
                }}>Create</DarkButton>
            </div>
        </div>
        </div>
        {loading? "Loading...": <div className="flex justify-center"><ZapTable zaps={zaps}/></div>}
    </div>
  )
}

function ZapTable({zaps}: {zaps: Zap[]}) {

    const router = useRouter()

    return (
      <div className="p-8 max-w-screen-lg w-full">
        <div className="flex">
          <div className="flex-1">Name</div>
          <div className="flex-1">ID</div>
          <div className="flex-1">Created on</div>
          <div className="flex-1">Webhook URL</div>
          <div className="flex-1">Go</div>
        </div>

        {zaps.map((z) => (
          <div className="flex border-b border-t py-4 items-center" key={z.id}>
            <div className="flex-1 flex flex-wrap items-center">
              <div className="flex flex-wrap">
                <img
                  src={z.trigger.type.image}
                  width={30}
                  alt="Trigger"
                  className="mr-2 mb-2"
                />
                {z.actions.map((x) => (
                  <img
                    key={x.id}
                    src={x.type.image}
                    width={30}
                    alt="Action"
                    className="mr-2 mb-2"
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">{formattedDate}</div>
            <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
            <div className="flex-1">
              <LinkButton
                onClick={() => {
                  router.push("/zap/" + z.id);
                }}
              >
                Go
              </LinkButton>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Dashboard