"use client"
import { BACKEND_URL } from "@/app/config"
import Appbar from "@/components/Appbar"
import Input from "@/components/Input"
import ZapCell from "@/components/ZapCell"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(x => setAvailableActions(x.data.availableActions));
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTrigger));
    }, []);

    return {
        availableActions, 
        availableTriggers
    }
}

const Page = () => {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();

    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string,
        name: string,
        image: string
    } | null>(null);

    const [selectedActions, setSelectedActions] = useState<{
        index: number,
        availableActionId: string,
        availableActionName: string,
        image: string,
        metadata: any
    }[]>([]);

    const [selectedModelIndex, setSelectedModelIndex] = useState<null | number>(null);

    const handlePublish = async () => {
        if (!selectedTrigger?.id) {
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                availableTriggerId: selectedTrigger.id,
                triggerMetadata: {},
                actions: selectedActions.map(a => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: a.metadata
                }))
            }, {
                headers: {
                    Authorization: localStorage.getItem("token") || ""
                }
            });
            router.push("/dashboard");
        } catch (error) {
            console.error('Error publishing:', error); 
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-end bg-slate-200 pt-5 pr-5">
                <PrimaryButton onClick={handlePublish}>Publish</PrimaryButton>
            </div>
            <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
                <div className="flex justify-center w-full">
                    <ZapCell 
                        onClick={() => setSelectedModelIndex(1)}
                        name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
                        image={selectedTrigger?.image}
                        index={1}
                    />
                </div>
                <div className="w-full py-2">
                    {selectedActions.map((action) => (
                        <div className="flex justify-center py-2" key={action.index}>
                            <ZapCell 
                                onClick={() => setSelectedModelIndex(action.index)}
                                name={action.availableActionName ? action.availableActionName : "Action"}
                                image={action.image}
                                index={action.index}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index: a.length + 2,
                            availableActionId: "",
                            availableActionName: "",
                            image: "",
                            metadata: {}
                        }])
                    }}>
                        <div className="text-2xl flex justify-center">+</div>
                    </PrimaryButton>
                </div>
            </div>
            {selectedModelIndex !== null && (
                <Modal 
                    availableItems={selectedModelIndex === 1 ? availableTriggers : availableActions}
                    onSelect={(props: null | { name: string, id: string, image: string, metadata: any }) => {
                        if (props === null) {
                            setSelectedModelIndex(null);
                            return;
                        }
                        if (selectedModelIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name,
                                image: props.image
                            });
                        } else {
                            setSelectedActions(a => {
                                let newActions = [...a];
                                newActions[selectedModelIndex - 2] = {
                                    index: selectedModelIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    image: props.image,
                                    metadata: props.metadata
                                };
                                return newActions;
                            });
                        }
                        setSelectedModelIndex(null);
                    }} 
                    index={selectedModelIndex}
                />
            )}
        </div>
    )
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string, id: string, image: string, metadata: any }) => void, availableItems: { id: string, name: string, image: string }[] }) {

    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
        image: string;
    }>();

    const isTrigger = index === 1;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-slate-200 bg-opacity-80">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <div className="text-xl">
                            Select {isTrigger ? "Trigger" : "Action"}
                        </div>
                        <button 
                            onClick={() => onSelect(null)} 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        {step === 0 && (
                            <div>{availableItems?.map(({ id, name, image }) => (
                                <div 
                                    key={id} 
                                    onClick={() => {
                                        if(isTrigger) {
                                            onSelect({ id, name, image, metadata: {} })
                                        } else {
                                            setStep(s => s + 1);
                                            setSelectedAction({ id, name, image });
                                        }
                                    }}
                                    className="flex border p-4 cursor-pointer hover:bg-slate-200"
                                >
                                    <img src={image} width={30} className="rounded-full mr-4" alt={name} />
                                    <div className="flex flex-col justify-center">{name}</div>
                                </div>
                            ))}
                            </div>
                        )}

                        {step === 1 && selectedAction?.id === "email" && (
                            <EmailSelector 
                                setMetadata={(metadata) => {
                                    onSelect({
                                        ...selectedAction,
                                        metadata
                                    });
                                }} 
                            />
                        )}

                        {step === 1 && selectedAction?.id === "send-sol" && (
                            <SolanaSelector 
                                setMetadata={(metadata) => {
                                    onSelect({
                                        ...selectedAction,
                                        metadata
                                    });
                                }} 
                            />
                        )}
                    </div> 
                </div>
            </div>
        </div>
    );
}


function EmailSelector({ setMetadata }: { setMetadata: (params: { email: string, body: string }) => void }) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div>
            <Input label="To" type="text" placeholder="Recipient's email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input label="Body" type="text" placeholder="Email body"
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="p-2">
            <PrimaryButton onClick={() => {
                setMetadata({ email, body });
            }}>
                Save Email Data
            </PrimaryButton>
            </div>
        </div>
    );
}

function SolanaSelector({ setMetadata }: { setMetadata: (params: { wallet: string, amount: string }) => void }) {
    const [wallet, setWallet] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <div>
            <Input label="Wallet" type="text" placeholder="Solana wallet address"
                onChange={(e) => setWallet(e.target.value)}
            />
            <Input label="Amount" type="text" placeholder="Amount to send"
                onChange={(e) => setAmount(e.target.value)}
            />
            <div className="p-2">
            <PrimaryButton onClick={() => {
                setMetadata({ wallet, amount });
            }}>
                Save Solana Data
            </PrimaryButton>
            </div>
        </div>
    );
}

export default Page;
