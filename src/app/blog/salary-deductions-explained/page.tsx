import Link from "next/link";

export default function SalaryDeductionsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        연봉 실수령액의 비밀 - 4대보험과 세금 완전 해부
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.16</time>
        <span>·</span>
        <span>읽기 9분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          &quot;연봉이 5,000만 원이면 매달 약 417만 원씩 받겠구나&quot;라고 생각했다면 큰 오산입니다.
          실제로는 국민연금, 건강보험, 고용보험, 소득세, 지방소득세를 합하면 월 60~80만 원이 공제됩니다.
          실수령액은 약 340만 원 수준입니다. 어디서 그 돈이 빠져나가는지 낱낱이 해부해봅니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4대보험이란?</h2>
        <p className="mb-4 leading-relaxed">
          4대 사회보험이란 국민연금, 건강보험, 고용보험, 산재보험을 말합니다.
          직장인은 이 중 산재보험을 제외한 3가지를 급여에서 공제합니다.
          산재보험은 전액 사업주가 부담합니다. 각 보험은 근로자와 사업주가 절반씩 부담하는 구조입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. 국민연금</h2>
        <p className="mb-4 leading-relaxed">
          국민연금은 노후에 연금을 받기 위해 납부하는 보험료입니다.
          보험료율은 <strong>월 소득의 9%</strong>이며, 근로자와 사업주가 각각 4.5%씩 부담합니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>보험료율: 9% (근로자 4.5% + 사업주 4.5%)</li>
          <li>상한액: 월 소득 617만 원 기준 (2024년 기준, 초과분은 적용 안 됨)</li>
          <li>하한액: 월 소득 39만 원 미만이면 최저 기준으로 부과</li>
        </ul>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 text-sm">
          <p className="font-semibold mb-1">계산 예시: 월급 300만 원</p>
          <p>국민연금 = 300만 × 4.5% = <strong>13만 5,000원</strong></p>
        </div>
        <p className="mb-4 leading-relaxed">
          국민연금은 내는 것이 아깝게 느껴질 수 있지만, 은퇴 후 평생 연금 형태로 돌려받습니다.
          납부 기간이 길수록 수령액이 늘어나므로 장기적으로는 유리합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. 건강보험</h2>
        <p className="mb-4 leading-relaxed">
          건강보험은 의료비 부담을 줄이기 위한 보험입니다.
          보험료율은 <strong>월 소득의 7.09%</strong> (2024년 기준)이며, 근로자와 사업주가 각각 3.545%씩 부담합니다.
          여기에 장기요양보험료(건강보험료의 12.95%)가 추가됩니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>건강보험료율: 7.09% (근로자 3.545%)</li>
          <li>장기요양보험료: 건강보험료의 12.95%</li>
          <li>상한·하한 기준 있음</li>
        </ul>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 text-sm">
          <p className="font-semibold mb-1">계산 예시: 월급 300만 원</p>
          <p>건강보험료 = 300만 × 3.545% = 약 10만 6,350원</p>
          <p>장기요양보험료 = 10만 6,350 × 12.95% = 약 1만 3,772원</p>
          <p>합계 = <strong>약 12만 122원</strong></p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. 고용보험</h2>
        <p className="mb-4 leading-relaxed">
          고용보험은 실업 시 실업급여를 받기 위한 보험입니다.
          근로자 부담률은 <strong>월 소득의 0.9%</strong>입니다. 사업주는 0.9~3.4%를 부담합니다(사업장 규모에 따라 다름).
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 text-sm">
          <p className="font-semibold mb-1">계산 예시: 월급 300만 원</p>
          <p>고용보험료 = 300만 × 0.9% = <strong>2만 7,000원</strong></p>
        </div>
        <p className="mb-4 leading-relaxed">
          고용보험은 실직 시 최대 9개월까지 실업급여를 받을 수 있어, 잘 활용하면 혜택이 큽니다.
          자발적 퇴직보다는 권고사직이나 계약 만료의 경우 실업급여를 받을 수 있습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. 소득세와 지방소득세</h2>
        <p className="mb-4 leading-relaxed">
          소득세는 근로소득에 부과되는 국세로, 누진세율 구조입니다.
          월급에서는 <strong>간이세액표</strong>에 따라 원천징수되며, 이듬해 2월 연말정산을 통해 정산합니다.
          지방소득세는 소득세의 10%입니다.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">과세표준 (연간)</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">세율</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">누진공제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1,400만 원 이하</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">6%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">-</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1,400만 ~ 5,000만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">15%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">126만 원</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">5,000만 ~ 8,800만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">24%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">576만 원</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">8,800만 ~ 1억 5,000만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">35%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1,544만 원</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1억 5,000만 ~ 3억 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">38%</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1,994만 원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 leading-relaxed text-sm text-slate-500 dark:text-slate-400">
          ※ 위 세율은 과세표준에 대한 것입니다. 과세표준은 연봉에서 근로소득공제, 인적공제 등을 차감한 금액으로 실제 연봉보다 훨씬 낮습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">연봉별 실수령액 요약표</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">연봉</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">월 세전</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">공제 합계</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">월 실수령</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">3,000만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">250만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">약 28만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">약 222만 원</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">4,000만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">333만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">약 43만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">약 290만 원</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">5,000만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">417만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">약 73만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">약 344만 원</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">7,000만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">583만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">약 120만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">약 463만 원</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">1억 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">833만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">약 200만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 font-semibold">약 633만 원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4 leading-relaxed text-sm text-slate-500 dark:text-slate-400">
          ※ 위 수치는 부양가족 없음, 비과세 없음 기준 근사값입니다. 실제 금액은 개인 상황에 따라 다릅니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">연말정산으로 세금 돌려받기</h2>
        <p className="mb-4 leading-relaxed">
          매달 원천징수되는 세금은 간이세액표 기준 추정치입니다. 실제 세금은 이듬해 2월 연말정산을 통해 정확히 계산됩니다.
          각종 공제를 잘 활용하면 세금을 돌려받을 수 있습니다.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>신용카드·체크카드 공제:</strong> 총급여의 25% 초과 사용분에 대해 15~40% 공제</li>
          <li><strong>의료비 공제:</strong> 총급여의 3% 초과 의료비의 15% 공제</li>
          <li><strong>교육비 공제:</strong> 본인·부양가족 교육비의 15% 공제</li>
          <li><strong>보험료 공제:</strong> 보장성 보험료 연 100만 원 한도 12% 공제</li>
          <li><strong>주택 관련 공제:</strong> 주택청약, 월세, 장기주택저당차입금 이자 공제</li>
          <li><strong>연금저축·IRP 공제:</strong> 연간 700~900만 원 한도 13~16.5% 세액공제</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">세금을 줄이는 합법적인 방법</h2>
        <p className="mb-4 leading-relaxed">
          세금을 완전히 피할 수는 없지만, 합법적으로 줄이는 방법이 있습니다:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>연금저축펀드 + IRP 최대 납입:</strong> 연간 최대 900만 원까지 세액공제. 세율 16.5% 적용 시 최대 148.5만 원 환급</li>
          <li><strong>ISA 계좌 활용:</strong> 투자 수익에 대한 세금 감면 혜택</li>
          <li><strong>체크카드 비중 늘리기:</strong> 신용카드(15%)보다 체크카드(30%)가 공제율이 높음</li>
          <li><strong>의료비·교육비 영수증 챙기기:</strong> 놓치기 쉬운 공제 항목</li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <Link
          href="/loan-calculator/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          PickPlay 연봉 실수령액 계산기 →
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          연봉을 입력하면 4대보험·소득세 공제 후 실수령액을 즉시 계산해드립니다.
        </p>
      </div>
    </article>
  );
}
