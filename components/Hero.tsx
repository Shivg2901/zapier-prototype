"use client"
import React from 'react'
import PrimaryButton from './buttons/PrimaryButton'
import SecondaryButton from './buttons/SecondaryButton'
import Feature from './Feature'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter()
  return (
    <div>
        <div className='flex justify-center'>
        <div className='text-5xl font-semibold text-center pt-8 max-w-xl'>
            Automate as fast as you can type
            
        </div>
        
        </div>
        <div className='flex justify-center'>
        <div className='text-xl font-normal text-center pt-8 max-w-3xl'>
        AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
        </div>
        </div>

        <div className='flex justify-center pt-4'>
            <PrimaryButton size='big' onClick={() => {
                router.push('/signup')
            }}>Get started free</PrimaryButton>
            <div className='pl-4'></div>
            <SecondaryButton size='big' onClick={() => {}}>Contact Sales</SecondaryButton>
        </div>

        <div className='flex justify-center'>
            <Feature title='Free forever' subtitle=' for core features'/>
            <Feature title='More apps' subtitle=' than any other platform'/>
            <Feature title='Cutting-edge' subtitle=' AI features'/>
        </div>
    </div>
  )
}

export default Hero



