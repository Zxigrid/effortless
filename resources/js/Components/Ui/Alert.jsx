import React, { useEffect, useState } from 'react'
import { Check } from 'react-feather'
import { usePage } from '@inertiajs/react'

const Alert = () => {
  const [sessionSuccess, setSessionSuccess] = useState('');
  const [sessionFailed, setSessionFailed] = useState('');
  const { session } = usePage().props;

  useEffect(() => {
    if (session.success) {
      setSessionSuccess(session.success);
    } else if (session.failed) {
      setSessionFailed(session.failed);
    }

    return () => {
      setSessionSuccess('');
      setSessionFailed('');
    }
  }, [session]);


  return (
    <>
      {
        sessionSuccess && (
          <div role="alert" className="alert alert-success rounded-md text-white p-3 relative">
            <Check />
            <span className="font-medium">{sessionSuccess}</span>
            <div className="gap-2 flex">
              <button type='button' onClick={() => setSessionSuccess('')} className="btn btn-sm border-0 text-xs h-6 min-h-6 rounded-[4px]">OK</button>
            </div>
          </div>
        )
      }
      {
        sessionFailed && (
          <div role="alert" className="alert alert-error rounded-md p-3 relative">
            <Check />
            <span className="font-medium">{sessionFailed}</span>
            <div className="gap-2 flex">
              <button type='button' onClick={() => setSessionSuccess('')} className="btn btn-sm border-0 text-xs h-6 min-h-6 rounded-[4px]">OK</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Alert
