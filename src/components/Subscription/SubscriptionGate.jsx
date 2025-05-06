import React,{useState}from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from '../../Services/api'
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from '@/components/ui/collapsible';
import Navbars from '../Navbars';

function SubscriptionGate() {
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [error, setError] = useState(null);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate  = useNavigate()
    const plans =[
        {
            title: "Monthly",
            price: "₹600",
            period: "/month",
            features: ["Access to all features", "Monthly updates", "Email support","Chat support"],
            planId:"plan_QQLbSJt12IIno1",
            bestValue: false,

        },
        {
            title: "Monthly",
            price: "₹7200",
            period: "/year",
            features: ["Access to all features", "Yearly  updates", "Email support","Chat support"],
            planId:"plan_QQLoAgF4AzJhLx",
            bestValue: false,
        },
        {
            title: "3 Year",
            price: "₹22000",
            period: "/3 year",
            features: ["Access to all features", "Yearly  updates", "Email support","Chat support"],
            planId:"plan_QQLnSR92Bob4hF",
            bestValue: true,
        }
    ]
    const faqs = [
        {
          question: 'Can I cancel my subscription anytime?',
          answer:
            'Yes, you can cancel your subscription at any time with no penalties.',
        },
      
        {
          question: 'Is there a free trial available?',
          answer: 'No, we do not currently offer a free trial. However, you can explore our demo or contact us for a personalized walkthrough before making a commitment',
        },
      ];
      const createSubscription = async (planId) => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await api.post('/api/subscriptions', { planId });
          const data = await response.data;
          setSubscriptionData(data);
          
          // Initialize Razorpay
          loadRazorpay(data.subscriptionId, planId);
        } catch (err) {
          setError(err.message || 'Something went wrong');
        } finally {
          setLoading(false);
        }
      };
    
      const loadRazorpay = (subscriptionId, planId) => {
        const plan = plans.find(p => p.planId === planId);
        
        if (!plan) {
          setError('Plan not found');
          return;
        }
    
        if (window.Razorpay) {
          initializePayment(subscriptionId, plan);
        } else {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => initializePayment(subscriptionId, plan);
          script.onerror = () => {
            setError('Failed to load Razorpay SDK');
          };
          document.body.appendChild(script);
        }
      };
      const verifyPayment = async (paymentData, subscriptionId) => {
        setVerifyingPayment(true);
        try {
          const response = await api.post('/api/razorpay/verify-subscription', {
            razorpayPaymentId: paymentData.razorpay_payment_id,
            razorpaySubscriptionId: subscriptionId,
            razorpaySignature: paymentData.razorpay_signature
          });
          
          if (response.status===200) {
            setPaymentSuccess(true);
            
            navigate('/dashboard/projects');
          } else {
            setError('Payment verification failed: ' + (response.data.message || 'Unknown error'));
          }
        } catch (err) {
          setError('Payment verification failed: ' + (err.message || 'Unknown error'));
        } finally {
          setVerifyingPayment(false);
        }
      };
      const initializePayment = (subscriptionId, plan) => {
        const options = {
          key: import.meta.env.VITE_API_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
          subscription_id: subscriptionId,
          name: 'Digi9',
          description: `${plan.title} Subscription`,
          handler: function (response) {
            
              
              console.log('Payment response:', response);
              verifyPayment(response, subscriptionId);
           
          },
          prefill: {
            name: '',
            email: email || '',
            contact: ''
          },
          theme: {
            color: '#007BFF'
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };
    
        try {
          const razorpayInstance = new window.Razorpay(options);
          razorpayInstance.open();
        } catch (err) {
          setError('Failed to initialize payment');
        }
      };


  return (
    <div>
        <Navbars/>
    
    <div className='flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-8'>
      <h1 className='text-3xl md:text-6xl font-bold mb-2 text-center font-Poppins'>Choose Your Perfect Plan</h1>
        <p className='text-muted-foreground text-center mb-8 md:mb-12'>Get unlimited access to our premium content with our flexible subscription options.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full">
         {plans.map((plan,index)=>{
            return(
                <Card
                key={index}
                className={`flex flex-col transition-transform duration-200 hover:scale-105 ${
                  plan.bestValue ? "border-primaryButton border-2 relative shadow-lg" : ""
                }`}
                >
                    {plan.bestValue && (
                  <Badge
                    variant="default"
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primaryButton text-white font-Poppins"
                  >
                    Recommended
                  </Badge>
                )}
                <CardHeader className="items-center text-center pt-8">
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <CardDescription className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-black">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primaryButton" />
                    <span className="text-black font-sans">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full transition-transform duration-200 hover:scale-105 ${
                  plan.bestValue ? "bg-primaryButton hover:bg-blue-500" : "border border-blue-500 text-blue hover:bg-blue-500"
                }`}
                variant={plan.bestValue ? "default" : "outline"}
                onClick={() => createSubscription(plan.planId)}
              >
                Choose Plan
              </Button>
            </CardFooter>
                </Card>
            )
           
         })}  
        </div>
         {/* Subscription Form */}
        <div className='max-w-2xl mx-auto space-y-12 py-16'>
        <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold font-Poppins">
            Get notified about special offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col">
              <Label htmlFor="email" className="py-1" >Email address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pr-12"
                />
             
              </div>
            </div>
            <Button type="submit" variant="default" className="w-full bg-primaryButton hover:bg-blue-600 hover:scale-105">
              Subscribe
            </Button>
          </form>
        </CardContent>
      </Card>
   
        </div> 
              {/* FAQ Section */}
        <div className="text-center">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                <Card key={idx} className="shadow-sm">
                    <CardContent className="p-0">
                    <Collapsible>
                        <CollapsibleTrigger className="w-full px-6 py-4 text-left text-bold font-sans">
                        {faq.question}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-6 pb-4 text-sm text-gray-600">
                        {faq.answer}
                        </CollapsibleContent>
                    </Collapsible>
                    </CardContent>
                </Card>
                ))}
            </div>   
    </div>
    </div>
  )
}

export default SubscriptionGate
